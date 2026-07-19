'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function HesabimPage() {
  const { user, updateProfile, deleteAccount } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    profession: user?.profession || '',
    location: user?.location || '',
  });
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setMessage('Bilgileriniz güncellendi');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Hesabım</h1>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
            {user.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>

        {message && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meslek</label>
            <input
              type="text"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
          >
            Kaydet
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <h2 className="font-semibold text-red-600 mb-2">Tehlikeli Bölge</h2>
        <p className="text-sm text-gray-500 mb-4">
          Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak kaybolur.
        </p>
        <button
          onClick={() => {
            if (confirm('Hesabınızı silmek istediğinize emin misiniz?')) {
              deleteAccount();
            }
          }}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          Hesabı Sil
        </button>
      </div>
    </div>
  );
}
