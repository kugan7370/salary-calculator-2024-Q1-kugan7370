import { ChangeEvent, useEffect, useState } from "react";
import "./Home.scss"
import TitleContainer from "../../components/TitleContainer";
import AllowanceInput from "../../components/AllowanceInput";
import DeductionInput from "../../components/DeductionInput";
import SalarySummary from "../../components/SalarySummary";

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




