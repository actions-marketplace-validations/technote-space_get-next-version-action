import { resolve } from 'path';
import { isTargetEvent } from '@technote-space/filter-github-action';
import { testEnv, getContext } from '@technote-space/github-action-test-helper';
import { describe, expect, it } from 'vitest';
import { TARGET_EVENTS } from '../constant';
import { getMinorUpdateCommitTypes, getExcludeMessages, getBreakingChangeNotes } from './misc';

const rootDir = resolve(__dirname, '../..');

describe('isTargetEvent', () => {
  testEnv();

  it('should return true 1', () => {
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      payload: {
        action: 'opened',
      },
      eventName: 'pull_request',
    }))).toBe(true);
  });

  it('should return true 2', () => {
    process.env.INPUT_IGNORE_CONTEXT_CHECK = 'true';
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      payload: {
        action: 'opened',
      },
      eventName: 'push',
    }))).toBe(true);
  });

  it('should return true 3', () => {
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      payload: {
        action: 'closed',
      },
      eventName: 'pull_request',
    }))).toBe(true);
  });

  it('should return false', () => {
    expect(isTargetEvent(TARGET_EVENTS, getContext({
      payload: {
        action: 'opened',
      },
      eventName: 'push',
    }))).toBe(false);
  });
});

describe('getMinorUpdateCommitTypes', () => {
  testEnv(rootDir);

  it('should get default minor update commit types', () => {
    expect(getMinorUpdateCommitTypes()).toEqual(['feat']);
  });

  it('should get minor update commit types', () => {
    process.env.INPUT_MINOR_UPDATE_TYPES = 'test1, test2\ntest3';
    expect(getMinorUpdateCommitTypes()).toEqual(['test1', 'test2', 'test3']);
  });
});

describe('getExcludeMessages', () => {
  testEnv(rootDir);

  it('should get default minor update commit types', () => {
    expect(getExcludeMessages()).toEqual([]);
  });

  it('should get minor update commit types', () => {
    process.env.INPUT_EXCLUDE_MESSAGES = 'test1, test2\ntest3';
    expect(getExcludeMessages()).toEqual(['test1', 'test2', 'test3']);
  });
});

describe('getBreakingChangeNotes', () => {
  testEnv(rootDir);

  it('should get default breaking change notes', () => {
    expect(getBreakingChangeNotes()).toEqual(['BREAKING CHANGE']);
  });

  it('should get breaking change notes', () => {
    process.env.INPUT_BREAKING_CHANGE_NOTES = 'test1, test2\ntest3';
    expect(getBreakingChangeNotes()).toEqual(['test1', 'test2', 'test3']);
  });
});
