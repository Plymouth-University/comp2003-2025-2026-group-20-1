#include <vector>
#include <string>
#include "Road System Basics.h"
using namespace std;


bool Node::isEqualTo(Node other)
{
	if (position == other.position) {
			return true;
		}
	return false;
};

Node::Node(vector<int> pos) {
	position = pos;
};

bool Edge::isEqualTo(Edge other) {
	if (nodeA.isEqualTo(other.nodeA)) {
		if (nodeB.isEqualTo(other.nodeB)) {
			return true;
		}
	}
	if (nodeA.isEqualTo(other.nodeB)) {
		if (nodeB.isEqualTo(other.nodeA)) {
			return true;
		}
	}
	return false;
};

Crossing::Crossing(vector<int> pos, string t) : position(pos), type(t) {}