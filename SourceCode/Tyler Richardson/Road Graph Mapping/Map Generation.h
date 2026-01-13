#pragma once
#include <vector>
#include <string>
#include "Road System Basics.h"
using namespace std;

class Tile {
public:
	string label;
	Tile(string label1) {
		label = label1;
	}
};

class RoadMap {
public:
	RoadMap(int width, int height);
	vector<vector<Tile>> map;
	static void drawEdgeOnMap(RoadMap& roadMap, Edge edge);
};