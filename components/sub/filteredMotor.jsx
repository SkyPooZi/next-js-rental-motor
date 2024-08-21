import React from 'react';
import { useEffect } from 'react';

export default function filteredMotor() {
    const token = Cookies.get('token');
    const [selectedFilter, setSelectedFilter] = useState('Rekomendasi');
    const [motors, setMotors] = useState([]);
    const [filteredMotors, setFilteredMotors] = useState([]);

    useEffect(() => {
        let filtered = motors;

        if (selectedFilter !== 'All') {
            filtered = motors.filter(motor => {
                if (selectedFilter === 'Matic') {
                    return motor.tipe_motor.includes('Matic');
                }
                if (selectedFilter === 'Sport') {
                    return motor.tipe_motor === 'Sport';
                }
                return true;
            });
        }

        setFilteredMotors(filtered);
    }, [selectedFilter, motors]);
    return (
        <div>

        </div>
    )
}
