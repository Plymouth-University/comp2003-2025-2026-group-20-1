#include <vector>
#include <string>
#include <map>
#include <algorithm> // for min/max
#include <cstdlib>   // for abs
#include "Map Generation.h"
using namespace std;


RoadMap::RoadMap(int width, int height) {
        map = vector<vector<Tile>>(height, vector<Tile>(width, Tile("empty")));
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
        while (true) {
            if (y >= 0 && y < height && x >= 0 && x < width) {
                roadMap.map[y][x] = Tile("road");
            }

            if (x == x2 && y == y2) break;
            int e2 = 2 * err;
            if (e2 >= dy) { // e_xy + e_x > 0
                err += dy;
                x += sx;
            }
            if (e2 <= dx) { // e_xy + e_y < 0
                err += dx;
                y += sy;
            }
        }
    };

