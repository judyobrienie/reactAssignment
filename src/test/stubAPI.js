// JavaScript source code
import _ from 'lodash';



class StubAPI {

    constructor() {
        this.cages = [
            {
                'price': 400,
                'id': 'Two-Door-Cage',
                'imageUrl': 'images/cages/cage.jpg',
                'name': 'Two Door Cage',
                'snippet': 'Stainless Steel Four Door Cage.'
            },
            {
                'price': 200,
                'id': 'Two-Door-Crates',
                'imageUrl': 'images/cages/dogcrates.jpg',
                'name': 'Two Door Dog Crates',
                'snippet': 'Stainless Steel Two Door Dog Crates.'
            },
            {
                'price': 300,
                'id': 'Stainless-Steel-Van-Floor',
                'imageUrl': 'images/cages/dogvan.jpg',
                'name': 'Stainless Steel Van Floor',
                'snippet': 'Stainless Steel Van Floor.'
            },
            {
                'price': 500,
                'id': 'Four-Door-Cage',
                'imageUrl': 'images/cages/fourdoorcage.jpg',
                'name': 'Four Door Cage',
                'snippet': 'Stainless Steel Four Door Cage.'
            },
            {
                'price': 100,
                'id': 'Two-Door-Greyhound-Cage',
                'imageUrl': 'images/cages/greyhoundcage.jpg',
                'name': 'Two Greyhound Cage',
                'snippet': 'Stainless Steel Two Door Greyhound Cage.'
            },
            {
                'price': 600,
                'id': 'Puppies-Cage',
                'imageUrl': 'images/cages/puppycages.jpg',
                'name': 'Puppies Cage',
                'snippet': 'Stainless Steel Six Puppies Cage.'
            },
            {
                'price': 350,
                'id': 'Side-Door-Cage',
                'imageUrl': 'images/cages/sidedoorcage.jpg',
                'name': 'Side Door Cage',
                'snippet': 'Stainless Steel Side Door Cage.'
            },
            {
                'price': 100,
                'id': 'Standalone-Cage',
                'imageUrl': 'images/cages/standalone.jpg',
                'name': 'Standalone Cage',
                'snippet': 'Stainless Steel Standalone Two Door Cage.'
            },
            {
                'price': 380,
                'id': 'Two-Doors-Cage',
                'imageUrl': 'images/cages/twodoorcage.jpg',
                'name': 'Two Doors Cage',
                'snippet': 'Stainless Steel Four Door Cage.'
            }


        ];
    }


    getAll() {
        return this.cages;
    }

    delete(k) {
        let elements = _.remove(this.cages,
            (cage) => cage.id === k
        );
        return elements;
    }
   
    add(n, i, s) {
        let len = this.cages.length;
        let newLen = this.cages.push({
            name: n, imageUrl: i, snippet: s
        });
        return newLen > len;
    }

    update(key, n, i, s) {
        var index = _.findIndex(this.cages,
            (cage) => cage.id === key
        );
        if (index !== -1) {
            this.cages.splice(index, 1,
                { name: n, imageUrl: i, snippet: s });
            return true;
        }
        return false;
    }

}

export default (new StubAPI());