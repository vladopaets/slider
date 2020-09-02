import React, {Component} from 'react';

import {Props, State} from './interface';
import './styles.scss';

class Slider extends Component<Props, State> {
    private readonly sliderRef: React.RefObject<HTMLDivElement> = React.createRef();
    private readonly innerRef: React.RefObject<HTMLDivElement> = React.createRef();
    private readonly slideRef: React.RefObject<HTMLDivElement> = React.createRef();
    private readonly baseArrowGap = 40;
    private slideGap = 0;

    state = {
        position: 0,
        slideWidth: 0,
    }

    componentDidMount(): void {
        if (!this.sliderRef?.current) {
            return;
        }

        const {itemsPerSlide, slideGap} = this.props;
        const sliderWidth = this.sliderRef.current.offsetWidth;
        const slideWidth = Number((sliderWidth / itemsPerSlide).toFixed(2));

        this.slideGap = slideGap || 10;
        this.setState({slideWidth});
    }

    prev = (): void => {
        const {slideWidth, position} = this.state;

        if (position + slideWidth > 0) {
            return;
        }

        const newPosition = Number((position + slideWidth).toFixed(2));

        this.setState({position: newPosition});
    }

    next = (): void => {
        const {slideWidth, position} = this.state;
        const scrollWidth = this.innerRef?.current?.scrollWidth;
        const sliderOffset = this.sliderRef?.current?.offsetWidth;

        if (!scrollWidth || !sliderOffset) {
            return;
        }

        if ((scrollWidth + position) < sliderOffset) {
            return;
        }

        const newPosition = Number((position - slideWidth).toFixed(2));

        this.setState({position: newPosition});
    }

    render(): JSX.Element | null {
        const {children} = this.props;
        const {position, slideWidth} = this.state;

        if (!children) {
            return null;
        }

        const count = React.Children.count(children);

        return (
            <div className='wrapper'>
                <div className='slider' ref={this.sliderRef}>
                    <div
                        className='inner'
                        style={{transform: `translate3d(${position}px, 0, 0)`}}
                        ref={this.innerRef}
                    >
                        {React.Children.map(children, (child) => (
                            <div
                                style={{
                                    width: `${slideWidth - this.slideGap * 2}px`,
                                    margin: `0 ${this.slideGap}px`
                                }}
                                ref={this.slideRef}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                </div>
                {count > 1 && (
                    <>
                        <span
                            className='prevBtn'
                            onClick={this.prev}
                            style={{left: -(this.baseArrowGap - this.slideGap) + 'px'}}
                        >
                            <img src="./svg/arrow-left-thin.svg" alt="arrow"/>
                        </span>
                        <span
                            onClick={this.next}
                            style={{right: -(this.baseArrowGap - this.slideGap) + 'px'}}
                        >
                            <img src="./svg/arrow-right-thin.svg" alt="arrow"/>
                        </span>
                    </>
                )}
            </div>
        );
    }
}

export default Slider;
