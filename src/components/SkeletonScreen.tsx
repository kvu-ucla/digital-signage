import './SkeletonScreen.css'

type SkeletonScreenProps = {
  screenType: string
}

export const SkeletonScreen = ({ screenType }: SkeletonScreenProps) => {
  if (screenType === 'horizontal') return <HorizontalSkeleton />
  if (screenType === 'vertical') return <VerticalSkeleton />
  return null
}

const HorizontalSkeleton = () => (
  <div className="skeleton-horizontal">
    <div className="skeleton-horizontal__header skeleton-shimmer" />
    <div className="skeleton-horizontal__body">
      <div className="skeleton-horizontal__graphic skeleton-shimmer" />
      <div className="skeleton-horizontal__main">
        <div className="skeleton-horizontal__hero skeleton-shimmer" />
        <div className="skeleton-horizontal__footer skeleton-shimmer" />
      </div>
      <div className="skeleton-horizontal__side">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="skeleton-horizontal__item skeleton-shimmer"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  </div>
)

const VerticalSkeleton = () => (
  <div className="skeleton-vertical">
    <div className="skeleton-vertical__header skeleton-shimmer" />
    <div className="skeleton-vertical__body">
      <div className="skeleton-vertical__graphic skeleton-shimmer" />
      <div className="skeleton-vertical__main">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="skeleton-vertical__item skeleton-shimmer"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  </div>
)
