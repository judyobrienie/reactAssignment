import React from 'react';
import localCache from './localCache';
import request from 'superagent';

class ImagesSection extends React.Component {
    render() {
        var thumbImages = this.props.cage.images.map(function (img, index) {
            return (
                <li>
                    <img key={index} src={"/cageSpecs/" + img}
                        alt="missing" />
                </li>
            );
        });
        var mainImage = (
            <div className="cage-images">
                <img src={"/cageSpecs/" + this.props.cage.images[0]}
                    alt={this.props.cage.name}
                    className="cage" />
            </div>
        );
        return (
            <div>
                {mainImage}
                <h1>{this.props.cage.name}</h1>
                <p>{this.props.cage.description}</p>
                <ul className="cage-thumbs">
                    {thumbImages}
                </ul>
            </div>
        );
    }
};

class CageDetail extends React.Component {
    state = {};

    componentDidMount() {
        request.get(
            '/cageSpecs/cages/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                localCache.setCage(json);
                this.setState({});
            });
    }

    render() {
        let display = <p>No Cage details</p>;
        let cage = localCache.getCage();
        if (cage) {
            display = <ImagesSection cage={cage} />;
        }
        return (
            <div>
                {display}
            </div>
        );
    }
};

export default CageDetail;