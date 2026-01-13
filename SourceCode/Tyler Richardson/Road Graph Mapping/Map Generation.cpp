#include <vector>
#include <string>
#include <map>
#include <algorithm> // for min/max
#include <cstdlib>   // for abs
#include <set>
#include <utility>
#include "Map Generation.h"
using namespace std;


Tile::Tile(int cost1, string label1) {
    cost = cost1;
    label = label1;
};



RoadMap::RoadMap(int width, int height) {
        map = vector<vector<Tile>>(height, vector<Tile>(width, Tile(0, "empty")));
    }


void RoadMap::drawEdgeOnMap(RoadMap& roadMap, Edge edge) {
        int x1 = edge.nodeA.position[0];
        int y1 = edge.nodeA.position[1];
        int x2 = edge.nodeB.position[0];
        int y2 = edge.nodeB.position[1];

        // Use Bresenham's line algorithm to draw any integer line between
        // (x1,y1) and (x2,y2). Choose a tile label based on broad orientation.
        int dx = std::abs(x2 - x1);
        int sx = x1 < x2 ? 1 : -1;
        int dy = -std::abs(y2 - y1);
        int sy = y1 < y2 ? 1 : -1;
        int err = dx + dy; // error value

        // bounds helpers
        int height = (int)roadMap.map.size();
        int width = height > 0 ? (int)roadMap.map[0].size() : 0;

        int x = x1;
        int y = y1;

        // collect Bresenham points
        vector<pair<int,int>> raw;
        raw.emplace_back(x, y);
        while (!(x == x2 && y == y2)) {
            int e2 = 2 * err;
            if (e2 >= dy) { err += dy; x += sx; }
            if (e2 <= dx) { err += dx; y += sy; }
            raw.emplace_back(x, y);
        }

        // convert to minimal 4-connected path (replace diagonal moves with a single orthogonal step)
        vector<pair<int,int>> path;
        if (!raw.empty()) path.push_back(raw[0]);
        for (size_t i = 1; i < raw.size(); ++i) {
            auto a = raw[i-1];
            auto b = raw[i];
            int dx_step = b.first - a.first;
            int dy_step = b.second - a.second;

            if (std::abs(dx_step) + std::abs(dy_step) == 1) {
                // orthogonal move — push target
                if (path.back() != b) path.push_back(b);
            } else if (std::abs(dx_step) == 1 && std::abs(dy_step) == 1) {
                // diagonal move — insert one orthogonal step (keep path minimal)
                pair<int,int> step = { b.first, a.second }; // horizontal then vertical
                if (path.back() != step) path.push_back(step);
                if (path.back() != b) path.push_back(b);
            } else {
                // fallback — push target
                if (path.back() != b) path.push_back(b);
            }
        }

        // draw single-tile-wide road (thickness = 0)
        for (const auto &pt : path) {
            int px = pt.first;
            int py = pt.second;
            if (py >= 0 && py < height && px >= 0 && px < width) {
                roadMap.map[py][px] = Tile(0, "road");
            }
        }
    };

void RoadMap::drawCrossingOnMap(RoadMap& roadMap, Crossing crossing) {
    int x = crossing.position.position[0];
    int y = crossing.position.position[1];
    roadMap.map[y][x] = Tile(1, "crossing");
    };
    


PriorityQueue::PriorityQueue(vector<int> start) {
	queue = { {0,start[0],start[1]} }; //first item is the priority, 2 other items are co-ordinates
	};

void PriorityQueue::push(int priority, vector<int> item) { //inserts item into queue based on priority
	for (size_t i = 0; i < queue.size(); i++) {
		if (queue[i][0] > priority) {
			queue.push_back({});
			for (size_t j = (queue.size() - 1); j > i; j--) {
				queue[j] = queue[j - 1];
			};
			queue[i] = { priority, item[0],item[1] };
			return;
		}
	}
	queue.push_back({ priority,item[0],item[1] });
};

vector<int> PriorityQueue::pop() {  //removes and returns the highest priority item
	vector<int> firstItem = queue[0];
	queue.erase(queue.begin());
	return firstItem;
};

int Manhattan(vector<int> a, vector<int> b) {  //use manhattan distance as heuristic for aStar
    return abs(a[0] - b[0]) + abs(a[1] - b[1]);
};

int aStar(const vector<vector<Tile>> &graph, const vector<int> &start, const vector<int> &goal) { // A* pathfinding: coords are (x,y) and graph is indexed as graph[y][x]
	PriorityQueue queue(start);
	map<vector<int>,int> costs;
	costs[start] = 0;
	map<vector<int>, vector<int>> predecessors;
	predecessors[start] = vector<int>{-1, -1};
	set<vector<int>> processed;
	// prepare
	int height = (int)graph.size();
	int width = height > 0 ? (int)graph[0].size() : 0;

	// main loop
	while (!queue.queue.empty()) {
		vector<int> poppedItem = queue.pop();
		vector<int> current = {poppedItem[1], poppedItem[2]}; // {x,y}

		if (current == goal) {
			return costs[current];
		}
		if (processed.find(current) == processed.end()) {
			processed.insert(current);
			vector<vector<int>> neighbourSquares = {
				{0,1},
				{0,-1},
				{1,0},
				{-1,0},
                {1,1},
				{1,-1},
				{-1,1},
				{-1,-1}};
			for (vector<int> square : neighbourSquares) {
				vector<int> neighbour = { current[0] + square[0],current[1] + square[1] };
				int nx = neighbour[0];
				int ny = neighbour[1];
				if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
				if (graph[ny][nx].cost == 0) continue;
				int newCost = costs[current] + graph[ny][nx].cost;
				if (costs.find(neighbour) == costs.end() || newCost < costs[neighbour]) {
					vector<int> nb = {nx, ny};
					costs[nb] = newCost;
					int priority = newCost + Manhattan(nb, goal)*2;
					predecessors[nb] = current;
					queue.push(priority, nb);
				}
			}
		}
	}
	return -1; //return -1 if there is no path
};