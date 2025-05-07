"use client"
import React,{useState} from 'react'

const Calculator = () => {
    const [balance, setBalance] = useState('100000');
    const [risk, setRisk] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [pair, setPair] = useState('EURUSD');
    const [result, setResult] = useState(null);

    const calculatePositionSize = () => {
        const accBalance = parseFloat(balance);
        const riskPercent = parseFloat(risk) / 100;
        const stopLossPips = parseFloat(stopLoss);

        if (!accBalance || !riskPercent || !stopLossPips) return;

        const riskAmount = accBalance * riskPercent;
        const pipValue = pair === 'EURUSD' ? 10 : 9.13; // per standard lot
        const lotSize = riskAmount / (stopLossPips * pipValue);
        const units = lotSize * 100000;

        setResult({
            riskAmount: riskAmount.toFixed(2),
            units: Math.round(units).toLocaleString(),
            lotSize: lotSize.toFixed(2),
        });
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result.lotSize);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Forex Position Size Calculator</h1>

            <div className="space-y-4 w-full max-w-md">
                <input
                    type="number"
                    placeholder="Account Balance (USD)"
                    value={balance}
                    onChange={e => setBalance(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="number"
                    placeholder="Risk % per trade"
                    value={risk}
                    onChange={e => setRisk(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="number"
                    placeholder="Stop Loss (pips)"
                    value={stopLoss}
                    onChange={e => setStopLoss(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                <div className="flex space-x-2">
                    <button
                        onClick={() => setPair('EURUSD')}
                        className={`flex-1 py-2 rounded border ${pair === 'EURUSD' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                    >
                        EUR/USD
                    </button>
                    <button
                        onClick={() => setPair('USDJPY')}
                        className={`flex-1 py-2 rounded border ${pair === 'USDJPY' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                    >
                        USD/JPY
                    </button>
                </div>

                <button
                    onClick={calculatePositionSize}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Calculate
                </button>

                {result && (
                    <div className="mt-4 p-4 border rounded text-sm bg-gray-50">
                        <p><strong>Risk Money, USD:</strong> ${result.riskAmount}</p>
                        <p><strong>Units:</strong> {result.units}</p>
                        <p className="flex items-center">
                            <strong>Sizing:</strong>&nbsp;{result.lotSize} lots
                            <button
                                onClick={handleCopy}
                                className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded"
                            >
                                Copy
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Calculator