'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.role !== 'doctor') {
        router.push('/auth/doctor/login');
      } else {
        setDoctor(parsed);
      }
    } else {
      router.push('/auth/doctor/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/auth/doctor/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">Doctor Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            {doctor ? (
              <div className="space-y-4">
                <p className="text-lg text-gray-700">Welcome, Dr. {doctor.name}</p>
                <p className="text-gray-500">Email: {doctor.email}</p>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <p className="text-gray-500">Loading doctor information...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
