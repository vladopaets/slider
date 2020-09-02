export interface Props {
    children: JSX.Element[],
    itemsPerSlide: number,
    slideGap?: number,
    className?: string,
}

export interface State {
    position: number,
    slideWidth: number,
}
