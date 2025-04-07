import './styles/PapierkorbButton.css';
import trashS1 from './assets/images/trashS1.png';
import trashS2 from './assets/images/trashS2.png';
import trashS3 from './assets/images/trashS3.png';
import trashS4 from './assets/images/trashS4.png';

interface Props {
    count: number;
    onClick: () => void;

}

export default function PapierkorbButton({ count, onClick }: Props) {

            const getIcon = () => {
            if (count === 0) return trashS1;
            if (count < 5) return trashS2;
            if (count < 10) return trashS3;
            return trashS4;
    };

    return (
        <button className="papierkorb-button" onClick={onClick}>
            <img src={getIcon()} alt="Papierkorb" className="papierkorb-icon" />
            <span className="papierkorb-label">Papierkorb</span>
            <span className="papierkorb-badge">{count} / 10</span>
        </button>
    );
}
