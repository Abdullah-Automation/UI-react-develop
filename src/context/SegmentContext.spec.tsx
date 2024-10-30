import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import {
  SegmentProvider,
  useSegment,
  addTranscriptionSegments,
} from './SegmentContext';

jest.mock('~/api/TranscriptionApi');

interface ISegment {
  retain_source: boolean;
  speaker: string;
  start_time: number;
  end_time: number;
  text: string;
}

describe('SegmentContext', () => {
  const transcriptData: ISegment[] = [
    {
      retain_source: false,
      speaker: 'Speaker 1',
      start_time: 0.08,
      end_time: 2.94,
      text: 'This is Ryan and this is my test video.',
    },
    // ... other segments ...
  ];

  // ... rest of your tests ...

  const wrapper: React.FC = ({ children }) => (
    <SegmentProvider initialData={transcriptData}>{children}</SegmentProvider>
  );

  it('should correctly merge segments', () => {
    const { result } = renderHook(() => useSegment(), { wrapper });

    act(() => {
      // TypeScript may require you to ensure that these functions exist
      result.current?.mergeSegment(2);
    });

    // Make sure to access the properties in a TypeScript-safe manner
    expect(result.current?.transcriptionSegments.length).toBe(
      transcriptData.length - 1
    );
    // ... other assertions ...
  });

  it('should update state correctly when adding a new segment', () => {
    // Arrange
    const transcriptionSegments = [
      {
        /* ...segment data... */
      },
    ];
    const index = 0;
    const cursorPosition = 5;
    const text = 'new segment text';

    // Act
    addTranscriptionSegments(
      transcriptionSegments,
      index,
      cursorPosition,
      text,
      mockSetTranscriptionSegments,
      mockApiQueue,
      { transcriptionId: 'test-id' }
    );

    // Assert
    expect(
      mockSetTranscriptionSegments
    ).toHaveBeenCalledWith(/* expected new state */);
  });

  // ... other tests ...
});

describe('addTranscriptionSegments', () => {
  const mockSetTranscriptionSegments = jest.fn();
  const mockApiQueue = { enqueue: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should split the segment and update state correctly', () => {
    // Arrange
    const transcriptionSegments = [
      {
        /* ...segment data... */
      },
    ];
    const index = 0; // index of the segment to split
    const cursorPosition = 5; // position in the text to split at
    const text = 'new segment text';

    // Act
    addTranscriptionSegments(
      transcriptionSegments,
      index,
      cursorPosition,
      text,
      mockSetTranscriptionSegments,
      mockApiQueue,
      { transcriptionId: 'test-id' } // Mock project data
    );

    // Assert
    expect(
      mockSetTranscriptionSegments
    ).toHaveBeenCalledWith(/* expected segments array */);
    expect(mockApiQueue.enqueue).toHaveBeenCalled();
    // Add more assertions as needed
  });

  // Additional test cases...
});
