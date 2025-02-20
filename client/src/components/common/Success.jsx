import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import successAnimation from '../../animations/success.json';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(-1); // Navigate back after 2 seconds
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, [navigate]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            flexDirection: 'column', 
            backgroundColor: '#f0f8ff' 
        }}>
            {/* Confetti effect */}
            <Confetti numberOfPieces={150} recycle={false} />

            {/* Success animation */}
            <Lottie animationData={successAnimation} style={{ width: 300, height: 300 }} />

            <h2 style={{ marginTop: 20, color: '#2c3e50', fontWeight: 'bold' }}>
                comment added successfully!
            </h2>
        </div>
    );
};

export default Success;
