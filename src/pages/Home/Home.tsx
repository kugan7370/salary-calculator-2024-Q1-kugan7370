import { ChangeEvent, useEffect, useState } from "react";
import "./Home.scss"

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
            <button onClick={() => handleRemove(allowance.id)}>
                <img src="./clear.png" alt="clear" />
            </button>
            <input type="checkbox" name="epf" checked={allowance.epf} onChange={(e) => handleChange(e, allowance.id)} />
            <span>EPF/ETF</span>
        </div>
    </div>
);

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
        <input type="text" name="title" value={deduction.title} onChange={(e) => handleChange(e, deduction.id)} />
        <input type="text" name="amount" value={deduction.amount} onChange={(e) => handleChange(e, deduction.id)} />
        <div className="buttonGroup">
            <button onClick={() => handleRemove(deduction.id)}>
                <img src="./clear.png" alt="clear" />
            </button>
        </div>
    </div>
);


interface SalarySummaryProps {
    basicSalary: number;
    totalAllowance: number;
    totalEarnings: number;
    grossDeduction: number;
    employeeEPF: number;
    APIT: number;
    netSalary: number;
    employerEPF: number;
    employerETF: number;
    CTC: number;
}

const SalarySummary: React.FC<SalarySummaryProps> = ({
    basicSalary,
    totalEarnings,
    grossDeduction,
    employeeEPF,
    APIT,
    netSalary,
    employerEPF,
    employerETF,
    CTC
}) => (
    <div className="right">
        <div className="titleContainer">
            <h4>Your salary</h4>
        </div>
        <div className="itemContainer">
            <div className="innerItemContainer">
                <h6>Items</h6>
                <h6>Amount</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Basic Salary</h6>
                <h6>{basicSalary.toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Gross Earnings</h6>
                <h6>{totalEarnings.toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Gross Deduction</h6>
                <h6>{(-grossDeduction).toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Employee EPF (8%)</h6>
                <h6>{(-employeeEPF).toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>APIT</h6>
                <h6>{(-APIT).toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Net Salary (Take Home)</h6>
                <h6>{netSalary.toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Contribution from the Employer</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Employer EPF (12%)</h6>
                <h6>{employerEPF.toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Employer ETF (3%)</h6>
                <h6>{employerETF.toLocaleString()}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>CTC (Cost to Company)</h6>
                <h6>{CTC.toLocaleString()}</h6>
            </div>
        </div>
    </div>
);


interface Allowance {
    id: number;
    title: string;
    amount: string;
    epf: boolean;
}

interface Deduction {
    id: number;
    title: string;
    amount: string;
}

const HomePage: React.FC = () => {
    const [allowances, setAllowances] = useState<Allowance[]>([
        { id: 1, title: 'Travel', amount: '10,000', epf: false }
    ]);
    const [deductions, setDeductions] = useState<Deduction[]>([
        { id: 1, title: 'No Pay', amount: '8,000.00' }
    ]);
    const [basicSalary, setBasicSalary] = useState<number>(150000);
    const [totalAllowance, setTotalAllowance] = useState<number>(0);

    useEffect(() => {
        const total = allowances.reduce((acc, allowance) => acc + parseFloat(allowance.amount.replace(/,/g, '')), 0);
        setTotalAllowance(total);
    }, [allowances]);

    const handleChangBasicSalary = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBasicSalary(parseFloat(value.replace(/,/g, '')));
    };

    const handleAllowanceChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value, type, checked } = e.target;
        setAllowances(allowances.map(allowance =>
            allowance.id === id ? { ...allowance, [name]: type === 'checkbox' ? checked : value } : allowance
        ));
    };

    const handleDeductionChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target;
        setDeductions(deductions.map(deduction =>
            deduction.id === id ? { ...deduction, [name]: value } : deduction
        ));
    };

    const handleAddAllowance = () => {
        const newId = allowances.length ? allowances[allowances.length - 1].id + 1 : 1;
        setAllowances([...allowances, { id: newId, title: '', amount: '0', epf: false }]);
    };

    const handleAddDeduction = () => {
        const newId = deductions.length ? deductions[deductions.length - 1].id + 1 : 1;
        setDeductions([...deductions, { id: newId, title: '', amount: '0' }]);
    };

    const handleRemoveAllowance = (id: number) => {
        setAllowances(allowances.filter(allowance => allowance.id !== id));
    };

    const handleRemoveDeduction = (id: number) => {
        setDeductions(deductions.filter(deduction => deduction.id !== id));
    };

    const reset = () => {
        setAllowances([{ id: 1, title: 'Travel', amount: '10,000', epf: false }]);
        setDeductions([{ id: 1, title: 'No Pay', amount: '8,000.00' }]);
        setBasicSalary(150000);
    };

    const totalEarnings = basicSalary + totalAllowance;
    const totalEarningsForEPF = basicSalary + allowances.filter(a => a.epf).reduce((acc, allowance) => acc + parseFloat(allowance.amount.replace(/,/g, '')), 0);
    const grossDeduction = deductions.reduce((acc, deduction) => acc + parseFloat(deduction.amount.replace(/,/g, '')), 0);
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const employeeEPF = totalEarningsForEPF * 0.08;
    const employerEPF = totalEarningsForEPF * 0.12;
    const employerETF = totalEarningsForEPF * 0.03;
    const APIT = calculateTax(grossEarnings);
    const netSalary = grossEarnings - employeeEPF - APIT;
    const CTC = grossEarnings + employerEPF + employerETF;

    console.log('totalEarnings', totalEarnings);
    console.log('totalEarningsForEPF', totalEarningsForEPF);
    console.log('grossDeduction', grossDeduction);
    console.log('grossEarnings', grossEarnings);
    console.log('grossSalaryForEPF', grossSalaryForEPF);
    console.log('employeeEPF', employeeEPF);
    console.log('employerEPF', employerEPF);
    console.log('employerETF', employerETF);
    console.log('APIT', APIT);
    console.log('netSalary', netSalary);
    console.log('CTC', CTC);



    function calculateTax(grossEarnings: number): number {
        let taxPercentage: number;
        let constant: number;

        if (grossEarnings <= 100000) {
            taxPercentage = 0;
            constant = 0;
        } else if (grossEarnings <= 141667) {
            taxPercentage = 6;
            constant = 6000;
        } else if (grossEarnings <= 183333) {
            taxPercentage = 12;
            constant = 14500;
        } else if (grossEarnings <= 225000) {
            taxPercentage = 18;
            constant = 25500;
        } else if (grossEarnings <= 266667) {
            taxPercentage = 24;
            constant = 39000;
        } else if (grossEarnings <= 308333) {
            taxPercentage = 30;
            constant = 55000;
        } else {
            taxPercentage = 36;
            constant = 73500;
        }

        const tax = (grossEarnings * taxPercentage / 100) - constant;
        return Math.max(tax, 0); // Ensure tax is not negative
    }

    console.log('totalAllowance', totalAllowance);
    return (
        <div className="container">
            <div className="innerContainer">
                <div className="left">
                    <TitleContainer title="Calculate Your Salary" reset={reset} />
                    <div className="detailContainer">
                        <div className="detail">
                            <h6>Basic Salary</h6>
                            <input type='text' onChange={handleChangBasicSalary} value={basicSalary.toLocaleString()} />
                        </div>
                        <div className="detail">
                            <h6>Earnings</h6>
                            <p>Allowance, Fixed Allowance, Bonus and etc.</p>
                            {allowances.map(allowance => (
                                <AllowanceInput
                                    key={allowance.id}
                                    allowance={allowance}
                                    handleChange={handleAllowanceChange}
                                    handleRemove={handleRemoveAllowance}
                                />
                            ))}
                            <div className="addContainer">
                                <button onClick={handleAddAllowance}>
                                    <img src="./Vector.png" alt="" />
                                </button>
                                <h6>Add New Allowance</h6>
                            </div>
                        </div>
                        <div className="detail">
                            <h6>Deductions</h6>
                            <p>Salary Advances, Loan Deductions and all</                            p>
                            {deductions.map(deduction => (
                                <DeductionInput
                                    key={deduction.id}
                                    deduction={deduction}
                                    handleChange={handleDeductionChange}
                                    handleRemove={handleRemoveDeduction}
                                />
                            ))}
                            <div className="addContainer">
                                <button onClick={handleAddDeduction}>
                                    <img src="./Vector.png" alt="" />
                                </button>
                                <h6>Add New Deduction</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <SalarySummary
                    basicSalary={basicSalary}
                    totalAllowance={totalAllowance}
                    totalEarnings={totalEarnings}
                    grossDeduction={grossDeduction}
                    employeeEPF={employeeEPF}
                    APIT={APIT}
                    netSalary={netSalary}
                    employerEPF={employerEPF}
                    employerETF={employerETF}
                    CTC={CTC}
                />
            </div>
        </div>
    );
};

export default HomePage;




