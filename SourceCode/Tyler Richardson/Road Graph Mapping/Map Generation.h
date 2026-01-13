#pragma once
#include <vector>
#include <string>
#include "Road System Basics.h"
using namespace std;

class Tile {
public:
	string label;
	int cost;
	Tile(int cost1, string label1);
	float dangerLevel;
};

class RoadMap {
public:
	RoadMap(int width, int height);
	vector<vector<Tile>> map;
	static void drawEdgeOnMap(RoadMap& roadMap, Edge edge);
	static void drawCrossingOnMap(RoadMap& roadMap, Crossing crossing);
};

class PriorityQueue { //Priority queue required for the aStar algorithm
public:
	vector<vector<int>> queue;
	PriorityQueue(vector<int> start);
	void push(int priority, vector<int> item);
	vector<int> pop();
};