import React, { PureComponent } from 'react';

export default class SlideShow extends PureComponent {
  constructor() {
    super();
    this.state = {
      pos: 0,
      lastPos: 0,
    };
    this.rotateSlide = this.rotateSlide.bind(this);
  }

  rotateSlide() {
    const { settings } = this.props;
    setInterval(() => {
      let { pos, lastPos } = this.state;
      lastPos = pos;
      pos++;

      if (pos >= settings.images.length) {
        pos = 0;
      }

      // Hide last image after a short delay.
      setTimeout(() => {
        lastPos = pos;
        this.setState({ lastPos });
      }, settings.delay / 2);

      this.setState({ lastPos, pos });
    }, settings.delay);
  }
  componentDidMount() {
    this.rotateSlide();
  }
  render() {
    const { pos, lastPos } = this.state;
    const { settings } = this.props;

    return (
      <div id="bg">
        {settings.images.map((image, i) => {
          return (
            <div
              key={image['url']}
              style={{
                backgroundPosition: image['position'],
                backgroundImage: `url("${image['url']}")`,
              }}
              className={
                i === pos ? 'visible top' : i === lastPos ? 'visible' : ''
              }
            />
          );
        })}
        ;
      </div>
    );
  }
}
