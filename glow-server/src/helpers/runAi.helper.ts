import { spawnSync } from 'child_process';

export function run_ai(message: string): string{
    const pythonProcess = spawnSync('python', ['run_model.py', message]);

    if (pythonProcess.error) {
      return `Error: ${pythonProcess.error.message}`;
    }

    const response = pythonProcess.stdout.toString().trim();
    return response;
  }