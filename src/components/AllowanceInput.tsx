import { ChangeEvent } from "react";


interface Allowance {
    id: number;
    title: string;
    amount: string;
    epf: boolean;
}

interface AllowanceInputProps {
    allowance: Allowance;
    handleChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    handleRemove: (id: number) => void;
}

const AllowanceInput: React.FC<AllowanceInputProps> = ({ allowance, handleChange, handleRemove }) => (
    <div className="innerDetailContainer">
        <input type="text" placeholder="Pay Details (Title)" name="title" value={allowance.title} onChange={(e) => handleChange(e, allowance.id)} />
        <input type="text" name="amount" placeholder="Amount" value={allowance?.amount} onChange={(e) => handleChange(e, allowance.id)} />
        <div className="buttonGroup">
            <div className="btnContainer" onClick={() => handleRemove(allowance.id)}>
                <img src="./clear.png" alt="clear" />
            </div>
            <input type="checkbox" name="epf" checked={allowance.epf} onChange={(e) => handleChange(e, allowance.id)} />
            <span>EPF/ETF</span>
            <div className="btnContainer-mobile" onClick={() => handleRemove(allowance.id)}>
                <img src="./clear.png" alt="clear" />
            </div>
        </div>
    </div>
);

export default AllowanceInput;