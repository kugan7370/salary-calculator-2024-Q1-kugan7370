import { ChangeEvent } from "react";


interface Deduction {
    id: number;
    title: string;
    amount: string;
}

interface DeductionInputProps {
    deduction: Deduction;
    handleChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    handleRemove: (id: number) => void;
}

const DeductionInput: React.FC<DeductionInputProps> = ({ deduction, handleChange, handleRemove }) => (
    <div className="innerDetailContainer">
        <input type="text" name="title" value={deduction.title} placeholder="Any Reduction" onChange={(e) => handleChange(e, deduction.id)} />
        <input type="text" name="amount" value={deduction.amount} onChange={(e) => handleChange(e, deduction.id)} />
        <div className="buttonGroup">
            <button onClick={() => handleRemove(deduction.id)}>
                <img src="./clear.png" alt="clear" />
            </button>
        </div>
    </div>
);

export default DeductionInput;