import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SegmentProvider } from './SegmentContext'; // Adjust the import path as necessary
import { SegmentEdit } from './SegmentEdit';

// Define a type for your segments
interface ISegment {
  startTime: number;
  endTime: number;
  content: string;
}

describe('SegmentEdit Component', () => {
  // Use the ISegment type for your mock segment data
  const mockSegments: ISegment[] = [
    { startTime: 0, endTime: 10, content: 'First segment' },
    { startTime: 11, endTime: 20, content: 'Second segment' },
    // Add more segments as needed for testing
  ];

  it('sets cursor at the start of a new segment', () => {
    const { getByDisplayValue } = render(
      <SegmentProvider>
        <SegmentEdit segments={mockSegments} segmentType='transcription' />
      </SegmentProvider>
    );

    // Simulate adding a new segment
    const firstSegment = getByDisplayValue('First segment');
    fireEvent.keyUp(firstSegment, { key: 'Enter', code: 'Enter' });

    // You would then check if the cursor is set at the start of the new segment
    // This might depend on how you manage focus and cursor in your application
  });

  it('merges segments correctly and sets cursor position', () => {
    const { getByDisplayValue } = render(
      <SegmentProvider>
        <SegmentEdit segments={mockSegments} segmentType='transcription' />
      </SegmentProvider>
    );

    // Simulate merging segments
    const secondSegment = getByDisplayValue('Second segment');
    fireEvent.keyUp(secondSegment, { key: 'Backspace', code: 'Backspace' });

    // Check if the segments are merged correctly
    // And if the cursor is positioned after the merged content
    // This test will need to account for how the cursor position is updated in your application
  });

  it('updates segment content on change', () => {
    const { getByDisplayValue } = render(
      <SegmentProvider>
        <SegmentEdit segments={mockSegments} segmentType='transcription' />
      </SegmentProvider>
    );

    const firstSegment = getByDisplayValue('First segment');
    fireEvent.change(firstSegment, { target: { value: 'Updated content' } });

    expect(getByDisplayValue('Updated content')).toBeInTheDocument();
  });

  it('calls save functionality on save button click', () => {
    const { getByText } = render(
      <SegmentProvider>
        <SegmentEdit segments={mockSegments} segmentType='transcription' />
      </SegmentProvider>
    );

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    // Verify if the save functionality is triggered
    // This might require mocking a function or observing changes in the state or props
  });

  it('handles segment click correctly', () => {
    // Create a mock function for handleSegmentClick
    const mockHandleSegmentClick = jest.fn();

    // Render the component with the mock function
    const { getByText } = render(
      <SegmentProvider>
        <SegmentEdit
          segments={mockSegments}
          segmentType='transcription'
          handleSegmentClick={mockHandleSegmentClick}
        />
      </SegmentProvider>
    );

    // Find the segment element in the DOM (adjust the selector as needed)
    const segmentElement = getByText('First segment');

    // Simulate a click event on the segment
    fireEvent.click(segmentElement);

    // Assert that the mock function was called with the correct startTime of the segment
    expect(mockHandleSegmentClick).toHaveBeenCalledWith(
      mockSegments[0].startTime
    );
  });

  // Add more tests as necessary
});
