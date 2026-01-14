import React, { useState, useEffect } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddIncomeForm = ({ onAddIncome, initialData }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    })

    useEffect(() => {
        if (initialData) {
            setIncome({
                source: initialData.source || "",
                amount: initialData.amount || "",
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
                icon: initialData.icon || "",
            })
        }
    }, [initialData])

    const handleChange = (key, value) => setIncome({ ...income, [key]: value })

    return (
        <div>

            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={(value) => handleChange("source", value)}
                label="Income Source"
                placeholder="Freelance , Salary, etc"
                type='text'
            />

            <Input
                value={income.amount}
                onChange={(value) => handleChange("amount", value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={(value) => handleChange("date", value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm