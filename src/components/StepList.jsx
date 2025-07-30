import { useDispatch, useSelector } from 'react-redux';
import { addStep, clearSteps, reorderSteps } from '../redux/campaignSlice';
import StepCard from './StepCard';
import { nanoid } from '@reduxjs/toolkit';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

function StepList() {
  const steps = useSelector((state) => state.campaign.steps);
  const dispatch = useDispatch();

  const handleAddStep = (type) => {
    const descriptions = {
      gift: 'Send a personalized gift to the user.',
      wait: 'Wait for a specific time before next step.',
      condition: 'Check user action like open/click.',
    };

    const newStep = {
      id: nanoid(), // must not change during drag
      type,
      description: descriptions[type],
    };

    dispatch(addStep(newStep));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Prevent reordering if dropped in the same place
    if (source.index === destination.index) return;

    dispatch(reorderSteps({
      fromIndex: source.index,
      toIndex: destination.index,
    }));
  };

  return (
    <div>
      {/* Add Step Buttons */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => handleAddStep('gift')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">➕ Send Gift</button>
        <button onClick={() => handleAddStep('wait')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">⏱️ Wait</button>
        <button onClick={() => handleAddStep('condition')} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">🔀 Condition</button>
        <button onClick={() => dispatch(clearSteps())} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">🧹 Clear All</button>
      </div>

      {steps.length === 0 && <p className="text-gray-500 text-sm">No steps added yet.</p>}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="step-list"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {steps.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white shadow rounded p-4"
                    >
                      <StepCard step={step} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default StepList;
