// src/components/StepList.jsx
import { useDispatch, useSelector } from 'react-redux';
import { addStep, clearSteps, reorderSteps } from '../redux/stepsSlice';
import StepCard from './StepCard';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';

function StepList() {
  const steps = useSelector((state) => state.steps.steps);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeStepId, setActiveStepId] = useState(null);

  useEffect(() => {
    localStorage.setItem('steps', JSON.stringify(steps));
  }, [steps]);

  const handleAddStep = (type) => {
    dispatch(addStep({ type }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;
    dispatch(reorderSteps({ fromIndex: source.index, toIndex: destination.index }));
  };

  const handleClearAll = () => {
    dispatch(clearSteps());
    setShowConfirm(false);
  };

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="w-full max-w-4xl bg-gray-50 border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Campaign Steps</h2>

        {steps.length === 0 && (
          <div className="text-center text-gray-500 text-sm bg-white rounded-md py-5 shadow-inner border">
            No steps added yet.
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="step-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <StepCard
                          step={step}
                          isActive={activeStepId === step.id}
                          onClick={() =>
                            setActiveStepId(activeStepId === step.id ? null : step.id)
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {steps.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium shadow"
            >
              🧹 Clear All Steps
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <p className="mb-4 text-gray-800 text-sm">
              Are you sure you want to clear all steps? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border text-gray-600 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepList;
