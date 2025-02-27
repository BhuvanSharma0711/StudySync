import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface PeopleCardProps {
    user: string;
    achivment: string;
}

const PeopleCard: React.FC<PeopleCardProps> = ({ user, achivment }) => {
    return (
        <Card className="flex items-center w-[30vw] mt-5 mr-[2.5vw] p-4 shadow-lg border rounded-lg">
            <Card.Img variant="top" src="./peoplecard.png" alt="People Card" className="w-full rounded-t-lg" />
            <Card.Body className="text-center">
                <Card.Title className="text-xl font-bold underline">{user}</Card.Title>
                <Card.Text className="text-lg font-semibold mt-2">
                    <h2>{achivment}</h2>
                </Card.Text>
            </Card.Body>
            <ListGroup className="w-full">
                <ListGroup.Item className="border-b p-2">Cras justo odio</ListGroup.Item>
                <ListGroup.Item className="border-b p-2">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item className="p-2">Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body className="flex justify-around w-full mt-4">
                <Card.Link href="#" className="text-blue-500 hover:underline">Card Link</Card.Link>
                <Card.Link href="#" className="text-blue-500 hover:underline">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default PeopleCard;
