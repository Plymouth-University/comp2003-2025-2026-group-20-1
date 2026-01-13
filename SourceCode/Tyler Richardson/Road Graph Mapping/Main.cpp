#include <iostream>
#include <vector>
#include <string>
#include "Road System Basics.cpp"
#include "Map Generation.cpp"
using namespace std;

// Main function to run the program
int main() {
    // Create a RoadMap of size 50x50
    RoadMap roadMap(50, 50);

//Make example data
    vector<Edge> roads;

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

    Node nodeG(vector<int>{45,30});
    Node nodeH(vector<int>{30,20});
    Edge edgeGH(nodeG, nodeH);
    roads.push_back(edgeGH);

    Node nodeI(vector<int>{45,30});
    Node nodeJ(vector<int>{45,22});
    Edge edgeIJ(nodeI, nodeJ);
    roads.push_back(edgeIJ);

    Node nodeK(vector<int>{28,7});
    Node nodeL(vector<int>{45,22});
    Edge edgeKL(nodeK, nodeL);
    roads.push_back(edgeKL);

    Node nodeM(vector<int>{28,7});
    Node nodeN(vector<int>{20,20});
    Edge edgeMN(nodeM, nodeN);
    roads.push_back(edgeMN);

    for (size_t i = 0; i < roads.size(); i++)
    {
        RoadMap::drawEdgeOnMap(roadMap, roads[i]);
    }

    // Output the map to console
    for (size_t y = 0; y < roadMap.map.size(); y++) {
        for (size_t x = 0; x < roadMap.map[0].size(); x++) {
            if (roadMap.map[y][x].label == "road") {
                cout << "O";
            } else if (roadMap.map[y][x].label == "pavement") {
                cout << "#";
            } else {
                cout << ".";
            }
        }
        cout << endl;
    }
    for (size_t y = 0; y < roadMap.map.size(); y++) {
        for (size_t x = 0; x < roadMap.map[0].size(); x++) {
            if (roadMap.map[y][x].label == "road") {   //search the 4 tiles around every road for empty space that need to be replaced with pavement
                for (int i = -2; i < 2; i++) {
                    if (roadMap.map[y+i%2][x+(i+1)%2].label != "road") {
                        roadMap.map[y+i%2][x+(i+1)%2] = Tile("pavement");
                    }
                }
            }
        }
    }
    for (size_t y = 0; y < roadMap.map.size(); y++) {
        for (size_t x = 0; x < roadMap.map[0].size(); x++) {
            if (roadMap.map[y][x].label == "road") {
                cout << "O";
            } else if (roadMap.map[y][x].label == "pavement") {
                cout << "#";
            } else {
                cout << ".";
            }
        }
        cout << endl;
    }
}
