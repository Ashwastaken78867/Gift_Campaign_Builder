import { useDispatch, useSelector } from 'react-redux';
import { setCampaignMetadata } from '../redux/campaignSlice';
import { useEffect, useState } from 'react';

function CampaignHeader() {
  const dispatch = useDispatch();
  const campaign = useSelector((state) => state.campaign);
  const [name, setName] = useState(campaign.name);
  const [createdBy, setCreatedBy] = useState(campaign.createdBy);

  useEffect(() => {
    dispatch(setCampaignMetadata({ name, createdBy }));
  }, [name, createdBy, dispatch]);

  return (
    <div className="bg-white shadow-md p-4 mb-6 rounded">
      <h2 className="text-xl font-semibold mb-4">📋 Campaign Details</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Created By"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      {campaign.createdAt && (
        <p className="text-sm text-gray-500 mt-2">
          Created on: {new Date(campaign.createdAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default CampaignHeader;
