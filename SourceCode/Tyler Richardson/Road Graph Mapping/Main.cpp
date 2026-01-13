#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include "Road System Basics.cpp"
#include "Map Generation.cpp"
using namespace std;

// Main function to run the program
int main() {
    // Create a RoadMap of size 50x50
    RoadMap roadMap(50, 50);

//Make example data
    vector<Edge> roads;
    vector<Crossing> crossings;

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


    Crossing crossing1(vector<int>{19,20}, "zebra");
    crossings.push_back(crossing1);
    Crossing crossing2(vector<int>{20,10}, "zebra");
    crossings.push_back(crossing2);
    Crossing crossing3(vector<int>{30,20}, "light");
    crossings.push_back(crossing3);
    Crossing crossing4(vector<int>{45,22}, "light");
    crossings.push_back(crossing4);
    Crossing crossing5(vector<int>{28,7}, "zebra");
    crossings.push_back(crossing5);


    for (size_t i = 0; i < roads.size(); i++)
    {
        RoadMap::drawEdgeOnMap(roadMap, roads[i]);
    }

    for (size_t i = 0; i < crossings.size(); i++)
    {
        RoadMap::drawCrossingOnMap(roadMap, crossings[i]);
    }


    //change empty tiles next to roads into pavement
    for (size_t y = 0; y < roadMap.map.size(); y++) {
        for (size_t x = 0; x < roadMap.map[0].size(); x++) {
            for (int i = -2; i < 2; i++) {
                    if (roadMap.map[y][x].label == "road" || roadMap.map[y][x].label == "crossing") {   //search the 4 tiles around every road for empty space that need to be replaced with pavement
                    if (roadMap.map[y+i%2][x+(i+1)%2].label == "empty") {
                        roadMap.map[y+i%2][x+(i+1)%2] = Tile(1, "pavement");
                    }
                }
            }
        }
    }
        // Output the map to console
    for (size_t y = 0; y < roadMap.map.size(); y++) {
        for (size_t x = 0; x < roadMap.map[0].size(); x++) {
            if (roadMap.map[y][x].label == "road") {
                cout << "O";
            } else if (roadMap.map[y][x].label == "pavement") {
                cout << "#";
            } else if (roadMap.map[y][x].label == "crossing") {
                cout << "@";
            } else {
                cout << ".";
            }
        }
        cout << endl;
    }

    for (int y = 0; y < roadMap.map.size(); y++) {
        for (int x = 0; x < roadMap.map[0].size(); x++) {
            if (roadMap.map[y][x].label == "pavement") {
                float paths_found = 0;
                float path_failures = 0;
                for (int searchX = -5; searchX < 5; searchX++) {
                    for (int searchY = -5; searchY < 5; searchY++) {
                        if (x + searchX >= 0 && x + searchX < roadMap.map[0].size() && y + searchY >= 0 && y + searchY < roadMap.map.size()) {
                            if (roadMap.map[y + searchY][x + searchX].label == "pavement") {
                                //cout << aStar(roadMap.map, vector<int>{x,y}, vector<int>{x + searchX,y + searchY});
                                if (aStar(roadMap.map, vector<int>{x,y}, vector<int>{x + searchX,y + searchY}) < 10) { //10 here is an arbitrary cutoff for what counts as a 'successful' path. It's the maximum number of steps a successful path can be
                                paths_found += 1;
                                } else {
                                    path_failures += 1;
                                }
                            }
                        }
                    }
                }
                roadMap.map[y][x].dangerLevel = path_failures/(paths_found + path_failures);
                //cout << roadMap.map[y][x].dangerLevel << " ";
                //cout << paths_found << " ";
                //cout << path_failures << " ";
            }
        }
        cout << endl;
    }
    for (size_t y = 0; y < roadMap.map.size(); y++) {
        for (size_t x = 0; x < roadMap.map[0].size(); x++) {
            if (roadMap.map[y][x].label == "pavement") {
                cout << trunc(roadMap.map[y][x].dangerLevel*9);
            } else if (roadMap.map[y][x].label == "crossing") {
                cout << "@";
            }
            else {
                cout << ".";
            }
        }
        cout << endl;
    }
}
