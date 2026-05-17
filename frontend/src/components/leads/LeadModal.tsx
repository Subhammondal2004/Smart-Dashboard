import {
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';

import {
  createLead,
  updateLead,
} from '../../api/leads.api';

import type {
  LeadWithId,
  LeadWithOutId,
} from '../../types/lead.types';

interface Props {
  open: boolean;

  onClose: () => void;

  onSuccess: () => void;

  editingLead?: LeadWithId | null;
}

const LeadModal = ({
  open,
  onClose,
  onSuccess,
  editingLead,
}: Props) => {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState<LeadWithOutId>({
      name: '',
      email: '',
      status: 'New',
      source: 'Website',
    });

  useEffect(() => {
    if (editingLead) {
      setFormData({
        name: editingLead.name,
        email: editingLead.email,
        status: editingLead.status,
        source: editingLead.source,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        status: 'New',
        source: 'Website',
      });
    }
  }, [editingLead]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingLead?._id) {
        await updateLead(
          editingLead._id,
          formData
        );

        toast.success(
          'Lead updated successfully'
        );
      } else {
        await createLead(formData);

        toast.success(
          'Lead created successfully'
        );
      }

      onSuccess();

      onClose();
    } catch (error) {
      toast.error(
        'Operation failed'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            {editingLead
              ? 'Update Lead'
              : 'Add Lead'}
          </h2>

          <button
            onClick={onClose}
            className='text-2xl text-gray-500 hover:text-black dark:hover:text-white'
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >
          <div>
            <label className='mb-2 block text-sm font-medium'>
              Name
            </label>

            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium'>
              Email
            </label>

            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium'>
              Status
            </label>

            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            >
              <option value='New'>
                New
              </option>

              <option value='Contacted'>
                Contacted
              </option>

              <option value='Qualified'>
                Qualified
              </option>

              <option value='Lost'>
                Lost
              </option>
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium'>
              Source
            </label>

            <select
              name='source'
              value={formData.source}
              onChange={handleChange}
              className='w-full rounded-xl border border-gray-300 bg-gray-50 p-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            >
              <option value='Website'>
                Website
              </option>

              <option value='Instagram'>
                Instagram
              </option>

              <option value='Referral'>
                Referral
              </option>
            </select>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-xl bg-gray-200 px-5 py-3 font-medium transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white'
            >
              Cancel
            </button>

            <button
              type='submit'
              disabled={loading}
              className='rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700'
            >
              {loading
                ? 'Saving...'
                : editingLead
                  ? 'Update Lead'
                  : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;