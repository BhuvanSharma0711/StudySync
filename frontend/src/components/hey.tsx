interface HeyProps {
    user: string;
}

const Hey: React.FC<HeyProps> = ({ user }) => {
    return (
        <div className="mt-2 flex justify-end w-full">
            <h3>Hey {user}</h3>
        </div>
    );
}

export default Hey;
