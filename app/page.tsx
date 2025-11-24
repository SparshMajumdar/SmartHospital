'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                HealthCare Management System
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Hospital Management System
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamlined healthcare management with RFID-based attendance tracking and
            intelligent appointment scheduling for better patient care.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">RFID Attendance</h3>
            <p className="text-gray-600">
              Automated doctor attendance tracking using RFID technology
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-gray-600">
              Intelligent appointment booking with automatic doctor assignment
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
            <p className="text-gray-600">
              Separate dashboards for doctors and patients with secure authentication
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Choose Your Role
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Doctor Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-300">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Doctor</h4>
                <p className="text-gray-600 mb-6">
                  Access your dashboard to view appointments and manage patient care.
                  RFID attendance tracking ensures accurate scheduling.
                </p>
                <div className="space-y-3">
                  <Link href="/auth/doctor/login">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                      Doctor Login
                    </Button>
                  </Link>
                  <div className="h-2"></div>
                  <Link href="/auth/doctor/register">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3 text-lg">
                      New Doctor Registration
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Patient Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-300">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">Patient</h4>
                <p className="text-gray-600 mb-6">
                  Book appointments, view your medical records, and manage your healthcare
                  with our intelligent scheduling system.
                </p>
                <div className="space-y-3">
                  <Link href="/auth/patient/login">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                      Patient Login
                    </Button>
                  </Link>
                  <div className="h-2"></div>
                  <Link href="/auth/patient/register">
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 text-lg">
                      New Patient Registration
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h4 className="font-semibold text-yellow-800 mb-3">Demo Credentials:</h4>
          <div className="text-sm text-yellow-700 space-y-2">
            <div>
              <strong>Doctor:</strong> sarah.johnson@hospital.com / doctor123
            </div>
            <div>
              <strong>Patient:</strong> john.doe@email.com / patient123
            </div>
            <div>
              <strong>RFID Tags:</strong> RFID001, RFID002, RFID003
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}