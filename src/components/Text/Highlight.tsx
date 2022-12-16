interface Props {
	children: string;
}

const Highlight = (props: Props) => {
	return <span className="bg-emerald-400 p-1 rounded-md dark:bg-orange-600">{props.children}</span>;
};

export default Highlight;
