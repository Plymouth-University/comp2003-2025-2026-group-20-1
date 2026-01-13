#pragma once
#include <vector>
#include <string>
using namespace std;

class Node {
public:
    vector<int> position;
    Node(vector<int> pos);
    bool isEqualTo (Node other);
    };

class Edge {
public:
    Node nodeA;
    Node nodeB;
    Edge(Node a, Node b) : nodeA(a), nodeB(b) {}
    bool isEqualTo(Edge other);
};

class Crossing {
public:
    string type;
                /*nodes located at T junctions need a crossing to identify which 2 of the 3 edges connected to the node
				 are the same road. These 'crossings' are really just the uninterupted pavements opposite the junction.
				 valid values for this variable are 'pavement' for these simple connections, 'zebra' for zebra crossings, and
				 'light' for crossings with traffic lights.*/
    Crossing(string t) : type(t) {}
};