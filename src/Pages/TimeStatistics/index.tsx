import React from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { shifts, users } from '../../Services/data/mockData';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const calculateHours = () => {
  const data: { userId: number; userName: string; totalHours: number; lateHours: number; avgLateMinutes: number }[] = [];

  users.forEach((user) => {
    let totalHours = 0;
    let lateHours = 0;
    let totalLateMinutes = 0;
    let lateEntryCount = 0;

    shifts.forEach((shift) => {
      shift.history.forEach((record) => {
        if (record.userId === user.id) {
          const start = new Date(`1970-01-01T${shift.startTime}:00`);
          const checkIn = new Date(`1970-01-01T${record.checkInTime}:00`);
          const checkOut = new Date(`1970-01-01T${record.checkOutTime}:00`);

          const hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
          totalHours += hours;

          if (checkIn > start) {
            const lateMinutes = (checkIn.getTime() - start.getTime()) / (1000 * 60);
            totalLateMinutes += lateMinutes;
            lateHours += lateMinutes / 60;
            lateEntryCount++;
          }
        }
      });
    });

    const avgLateMinutes = lateEntryCount > 0 ? totalLateMinutes / lateEntryCount : 0;
    data.push({ userId: user.id, userName: user.name, totalHours, lateHours, avgLateMinutes });
  });

  return data;
};

const TimeStatistics: React.FC = () => {
  const timeStatisticsData = calculateHours();

  const totalDirectHours = timeStatisticsData.reduce((sum, record) => sum + record.totalHours, 0);
  const totalLateHours = timeStatisticsData.reduce((sum, record) => sum + record.lateHours, 0);

  const barChartData = {
    labels: timeStatisticsData.map((record) => record.userName),
    datasets: [
      {
        label: 'Giờ trực',
        data: timeStatisticsData.map((record) => record.totalHours),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Giờ trễ',
        data: timeStatisticsData.map((record) => record.lateHours),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Giờ trực', 'Giờ trễ'],
    datasets: [
      {
        data: [totalDirectHours, totalLateHours],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const avgLateMinutesData = {
    labels: timeStatisticsData.map((record) => record.userName),
    datasets: [
      {
        label: 'Trung bình phút đi trễ',
        data: timeStatisticsData.map((record) => record.avgLateMinutes),
        borderColor: 'rgba(255, 206, 86, 0.8)',
        backgroundColor: 'rgba(255, 206, 86, 0.4)',
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels: timeStatisticsData.map((record) => record.userName),
    datasets: [
      {
        label: 'Phần trăm thời gian trực',
        data: timeStatisticsData.map((record) => record.totalHours),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-8 bg-white dark:bg-[#031C30] shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700 dark:text-darkPrimary">
        Thống Kê Thời Gian Trực
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-[#193247] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center text-primary dark:text-darkPrimary mb-4">
            Giờ Trực của Giảng Viên
          </h3>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white dark:bg-[#193247] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center text-primary dark:text-darkPrimary mb-4">
            Trung Bình Phút Đi Trễ
          </h3>
          <Line data={avgLateMinutesData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-[#193247] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center text-primary dark:text-darkPrimary mb-4">
              Phân Bổ Giờ Trực và Giờ Trễ
            </h3>
            <Doughnut data={doughnutChartData} />
          </div>
        <div className="bg-white dark:bg-[#193247] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center text-primary dark:text-darkPrimary mb-4">
            Phần Trăm Thời Gian Trực
          </h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      

      
    </div>
  );
};

export default TimeStatistics;
