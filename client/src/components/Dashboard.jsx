import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditSubmission from './EditSubmission';

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [editingSubmission, setEditingSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/submission/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/submission/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }

      setSubmissions(prev => prev.filter(sub => sub._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete submission');
    }
  };

  const handleUpdate = (updatedSubmission) => {
    setSubmissions(submissions.map(sub =>
      sub._id === updatedSubmission._id ? updatedSubmission : sub
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchSubmissions();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="p-6">
            {submissions.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No submissions found</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {submissions.map((submission) => (
                  <div
                    key={submission._id}
                    className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">
                            {submission.name || 'Untitled'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {submission.createdAt && new Date(submission.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingSubmission(submission)}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(submission._id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Company: {submission.company || 'N/A'}
                        </p>
                        {submission.questions && submission.questions.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-500">Interview Questions:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {submission.questions.map((question, index) => (
                                <li key={index} className="mt-1">{question}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSubmission && (
        <EditSubmission
          submission={editingSubmission}
          onClose={() => setEditingSubmission(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default Dashboard;
