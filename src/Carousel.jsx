import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0, // index first photo
  }

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index
    })
  };

  render() {
    const { active } =  this.state;
    const { images } = this.props;

    return (
      <div className="flex justify-around items-center mt-2 h-25">
        <img className="max-w-[45%] max-h-25" src={images[active]} alt="animal hero" />
        <div className="w-1/2">
          {
            images.map((photo, index) => (
              // eslint-disable-next-line
              <img 
                onClick={this.handleIndexClick}
                data-index={index}
                key={photo}
                src={photo}
                className={`rounded-full w-100px h-100px inline-block m-15px cursor-pointer border-2 border-solid ${index === active ? "active" : ""}`}
                alt="animal thumbnail"
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Carousel;