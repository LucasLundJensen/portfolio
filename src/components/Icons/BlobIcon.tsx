interface Props {
	className: string;
}

const BlobIcon = (props: Props) => {
	return (
		<svg
			className={props.className}
			fill="currentColor"
			id="visual"
			viewBox="0 0 30 30"
			width="30"
			height="30"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
		>
			<g transform="translate(14.381901384874773 15.482525172797965)">
				<path d="M9.1 -11C11.7 -8.6 13.7 -5.7 14.3 -2.5C14.8 0.6 13.9 4.1 12.3 7.2C10.6 10.3 8.2 13.1 5.4 13.6C2.6 14.1 -0.6 12.2 -4.2 11.1C-7.9 10 -12.1 9.7 -13 7.7C-13.9 5.7 -11.6 2 -9.9 -0.8C-8.3 -3.6 -7.4 -5.7 -5.8 -8.2C-4.3 -10.8 -2.1 -13.9 0.5 -14.5C3.2 -15.2 6.4 -13.3 9.1 -11"></path>
			</g>
		</svg>
	);
};

export default BlobIcon;
