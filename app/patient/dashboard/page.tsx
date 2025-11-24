'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Calendar, Plus, Clock, LogOut } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    healthIssue: '',
    customIssue: '',
    timeSlot: '',
    date: new Date().toISOString().split('T')[0],
  });

  const healthIssues = [
    'Fever', 'Cold/Flu', 'Headache', 'Stomach Pain', 'Injury',
    'Skin Problem', 'Chest Pain', 'Back Pain', 'Other'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Load user from localStorage and fetch appointments
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'patient') {
      router.push('/');
      return;
    }

    setUser(parsedUser);
    fetchAppointments(parsedUser.id, token);
  }, [router]);

  const fetchAppointments = async (patientId: string, token: string) => {
    try {
      const res = await fetch(`/api/appointments/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error('Failed to fetch appointments:', await res.text());
        setAppointments([]);
        return;
      }

      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load appointments', err);
      setAppointments([]);
    }
  };

  const handleAppointment = async () => {
    if (!form.healthIssue || !form.timeSlot || !form.date) {
      setMessage('Fill in all fields');
      return;
    }

    if (form.healthIssue === 'Other' && !form.customIssue.trim()) {
      setMessage('Please specify your custom issue');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          patientId: user.id,
          patientName: user.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Booking failed');
      } else {
        setMessage(`✅ Appointment booked with ${data.doctorName}`);
        setShowForm(false);
        fetchAppointments(user.id, token!);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-gray-600">Welcome, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
            <Button onClick={logout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {message && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{message}</AlertDescription>
          </Alert>
        )}

        {/* Appointment Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Health Issue</Label>
                  <Select
                    onValueChange={(v) => setForm((p) => ({ ...p, healthIssue: v }))}
                    value={form.healthIssue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {healthIssues.map((issue) => (
                        <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {form.healthIssue === 'Other' && (
                    <>
                      <Label>Custom Issue</Label>
                      <Input
                        value={form.customIssue}
                        onChange={(e) => setForm((p) => ({ ...p, customIssue: e.target.value }))}
                        placeholder="Describe issue"
                      />
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                  />

                  <Label>Time Slot</Label>
                  <Select
                    onValueChange={(v) => setForm((p) => ({ ...p, timeSlot: v }))}
                    value={form.timeSlot}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button onClick={handleAppointment} disabled={loading} className="bg-green-600 hover:bg-green-700">
                  {loading ? 'Booking...' : 'Book'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appointment List */}
        <Card>
          <CardHeader>
            <CardTitle>My Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No appointments booked yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {appointments.map((a: any) => (
                  <div key={a._id} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">Dr. {a.doctorName}</h4>
                        <p className="text-sm text-gray-600">
                          Issue: {a.healthIssue} {a.customIssue && `- ${a.customIssue}`}
                        </p>
                      </div>
                      <Badge>{a.status || 'Scheduled'}</Badge>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{a.date}</div>
                      <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{a.timeSlot}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
