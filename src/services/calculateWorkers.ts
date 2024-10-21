import os from 'os';

export type workersType = {
  host: string;
  port: number;
};

export const getWorkers = (hostname: string, startPort: number) => {
  const available = os.cpus().length;
  const res: workersType[] = [];
  for (let i = 0; i < available; i++) {
    res.push({ host: hostname, port: startPort + i + 1 });
  }
  return res;
};
