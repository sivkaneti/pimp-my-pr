import { HttpErrorResponse } from '@angular/common/http';
import { RepositoryModel, ReviewerStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { fromReviewerStatisticsActions } from './reviewer-statistics.actions';

export const REVIEWERSTATISTICS_FEATURE_KEY = 'ReviewerStatisticsStatistics';

export interface ReviewerStatisticsState {
  reviewerStatisticsResponse: ReviewerStatisticsResponse | null;
  reviewerStatisticsResponseLoading: boolean;
  reviewerStatisticsResponseLoadError: HttpErrorResponse | null;
  reviewerStatisticsSelectedRepositories: RepositoryModel[];
}

export interface ReviewerStatisticsPartialState {
  readonly [REVIEWERSTATISTICS_FEATURE_KEY]: ReviewerStatisticsState;
}

export const initialState: ReviewerStatisticsState = {
  reviewerStatisticsResponse: null,
  reviewerStatisticsResponseLoading: false,
  reviewerStatisticsResponseLoadError: null,
  reviewerStatisticsSelectedRepositories: []
};

export function reviewerStatisticsReducer(
  state: ReviewerStatisticsState = initialState,
  action: fromReviewerStatisticsActions.CollectiveType
): ReviewerStatisticsState {
  switch (action.type) {
    case fromReviewerStatisticsActions.Types.GetReviewerStatisticsResponse: {
      state = {
        ...state,
        reviewerStatisticsResponse: null,
        reviewerStatisticsResponseLoading: true,
        reviewerStatisticsResponseLoadError: null,
        reviewerStatisticsSelectedRepositories: []
      };
      break;
    }

    case fromReviewerStatisticsActions.Types.GetReviewerStatisticsResponseFail: {
      state = {
        ...state,
        reviewerStatisticsResponse: null,
        reviewerStatisticsResponseLoading: false,
        reviewerStatisticsResponseLoadError: action.payload
      };
      break;
    }

    case fromReviewerStatisticsActions.Types.GetReviewerStatisticsResponseSuccess: {
      state = {
        ...state,
        reviewerStatisticsResponse: action.payload,
        reviewerStatisticsResponseLoading: false,
        reviewerStatisticsResponseLoadError: null,
        reviewerStatisticsSelectedRepositories: action.payload.repositories
      };
      break;
    }

    case fromReviewerStatisticsActions.Types.ReviewerStatisticsAddSelectedRepository: {
      state = {
        ...state,
        reviewerStatisticsSelectedRepositories: [
          ...state.reviewerStatisticsSelectedRepositories,
          action.payload
        ]
      };
      break;
    }

    case fromReviewerStatisticsActions.Types.ReviewerStatisticsRemoveSelectedRepository: {
      state = {
        ...state,
        reviewerStatisticsSelectedRepositories: state.reviewerStatisticsSelectedRepositories.filter(
          repository => repository.fullName !== action.payload.fullName
        )
      };
      break;
    }
  }

  return state;
}
