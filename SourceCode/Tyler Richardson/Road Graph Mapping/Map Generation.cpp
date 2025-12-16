#include <vector>
#include <string>
#include <map>
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
    vector<vector<Tile>> map;
    RoadMap(int width, int height) {
        map = vector<vector<Tile>>(height, vector<Tile>(width, Tile("empty")));
    }
};