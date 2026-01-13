#include <iostream>
#include <vector>
#include <string>
#include "Road System Basics.h"
#include "Map Generation.h"
using namespace std;

// Main function to run the program
int main() {
    // Create a RoadMap of size 50x50
    RoadMap roadMap(50, 50);

//Make example data
    vector<Edge> roads;

    Node node1(vector<int>{10,10});
    Node node2(vector<int>{10,20});
    Node nodeA(vector<int>{10,10});
    Node nodeB(vector<int>{20,10});
    Edge edgeAB(nodeA, nodeB);
    roads.push_back(edgeAB);

    Node nodeC(vector<int>{20,20});
    Node nodeD(vector<int>{20,10});
    Edge edgeCD(nodeC, nodeD);
    roads.push_back(edgeCD);

    Node nodeE(vector<int>{10,20});
    Node nodeF(vector<int>{30,20});
    Edge edgeEF(nodeE, nodeF);
    roads.push_back(edgeEF);

    for (size_t i = 0; i < roads.size(); i++)
    {
        RoadMap::drawEdgeOnMap(roadMap, roads[i]);
    }
    // Output the map to console
    for (size_t y = 0; y < roadMap.map.size(); y++) {
        for (size_t x = 0; x < roadMap.map[0].size(); x++) {
            if (roadMap.map[y][x].label == "road") {
                cout << "#";
            } else {
                cout << ".";
            }
        }
        cout << endl;
    }
};