import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Select,
  Option,
  Input,
  Button
} from '@/components/ui';
import SudokuBackend from './sudoku-backend-js';

const SudokuFrontend = () => {
  const [game, setGame] = useState(null);
  const [difficulty, setDifficulty] = useState('beginner');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [solution, setSolution] = useState(Array(81).fill(0));

  useEffect(() => {
    const backend = new SudokuBackend();
    setGame(backend.getGame(difficulty, selectedIndex));
  }, [difficulty, selectedIndex]);

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    setSelectedIndex(0);
  };

  const handleIndexChange = (value) => {
    setSelectedIndex(value);
  };

  const handleSolutionChange = (index, value) => {
    const newSolution = [...solution];
    newSolution[index] = value;
    setSolution(newSolution);
  };

  const handleSubmit = () => {
    const backend = new SudokuBackend();
    const isValid = backend.checkSolution(difficulty, selectedIndex, solution);
    alert(isValid ? 'Solution is valid!' : 'Solution is not valid.');
  };

  if (!game) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Sudoku</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            Difficulty:
            <Select value={difficulty} onChange={handleDifficultyChange}>
              <Option value="beginner">Beginner</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="pro">Pro</Option>
            </Select>
          </div>
          <div>
            Game:
            <Input
              type="number"
              min="0"
              max={game.games[difficulty].length - 1}
              value={selectedIndex}
              onChange={handleIndexChange}
            />
          </div>
        </div>
        <table className="w-full border-collapse">
          {game.board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="border p-2 text-center"
                  style={{
                    backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#f1f1f1' : 'white'
                  }}
                >
                  <Input
                    type="number"
                    min="1"
                    max="9"
                    value={solution[rowIndex * 9 + colIndex] || ''}
                    onChange={(e) =>
                      handleSolutionChange(rowIndex * 9 + colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </table>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit}>Submit Solution</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SudokuFrontend;
