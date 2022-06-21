import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Alert } from '@mui/lab'
import { Tooltip } from '@mui/material';

export interface ErrorBoundaryProps {
  children?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError?: boolean;
  tooltip?: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(error.message);
  }

  render() {
    const { hasError, tooltip } = this.state;
    if (hasError) {      // You can render any custom fallback UI
      return (
        <Tooltip
          open={tooltip}
          onClose={this.handleTooltipClose}
          onOpen={this.handleTooltipOpen}
          title="Une erreur est survenue dans le rendue"
        >
          <Alert severity="error"></Alert>
        </Tooltip>
      );
    }
    return this.props.children;
  }

  handleTooltipClose () {
    this.setState({ tooltip: false });
  };

  handleTooltipOpen() {
    this.setState({ tooltip: true });
  };

}