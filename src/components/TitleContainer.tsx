
interface TitleContainerProps {
    title: string;
    reset?: () => void;
}

const TitleContainer: React.FC<TitleContainerProps> = ({ title, reset }) => {
    return (
        <div className="titleContainer">
            <h4>{title}</h4>
            {reset && (
                <div className="iconContainer" onClick={reset}>
                    <img src="./reset.png" alt="reset" />
                    <span>Reset</span>
                </div>
            )}
        </div>
    );
};

export default TitleContainer;