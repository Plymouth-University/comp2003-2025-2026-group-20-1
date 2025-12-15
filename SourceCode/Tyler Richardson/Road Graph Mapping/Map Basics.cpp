#include <vector>
using namespace std;


class Node {
public:
	vector<int> point;
	Node() {}
	Node(vector<int> point1) {
		point = point1;
	}
	bool isEqualTo (Node other) {
		if (point == other.point) {
				return true;
			}
		return false;
	}
};

class Edge {
public:
	Node p1;
	Node p2;
	Edge(Node point1, Node point2) {
		p1 = point1;
		p2 = point2;
	}
	bool isEqualTo(Edge other) {
		if (p1.isEqualTo(other.p1)) {
			if (p2.isEqualTo(other.p2)) {
				return true;
			}
		}
		if (p1.isEqualTo(other.p2)) {
			if (p2.isEqualTo(other.p1)) {
				return true;
			}
		}
		return false;
	}
};
