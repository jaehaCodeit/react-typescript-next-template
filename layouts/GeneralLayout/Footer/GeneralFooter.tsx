import { observer } from 'mobx-react'
import Link from 'next/link'
import { useCallback } from 'react'
import { IS_SERVER } from 'utils'
import './GeneralFooter.scss'
import { META_SNS, META_FOOTER } from 'public/static/reference/metadata'

interface IGeneralFooterProps {
  isTransparent?: boolean
}

const GeneralFooter = (props: IGeneralFooterProps) => {
  const { isTransparent=false } = props;

  const onPrivacyClick = useCallback(() => {
    // privacy
  }, []);

  const onUseClick = useCallback(() => {
    // use term
  }, []);

  const FooterTextEach = ({ head, body }: any) => {
    return (
      <span className="GeneralFooter__content--textEach">
        <span className="GeneralFooter__content--textHead">{head}</span>
        <span className="GeneralFooter__content--textBody">{body}</span>
      </span>
    )
  }

  const FooterIconEach = ({ link, imgSrc }: any) => {
    if (link) {
      return (
        <Link href={link} as={link} prefetch={false}>
          <a className="GeneralFooter__content--iconEach" target={"_blank"}>
            <img src={imgSrc} className="GeneralFooter__content--iconImg" />
          </a>
        </Link>
      )
    } else {
      return <></>
    }
  }

  const showBtwBar = (underMobile: boolean, aboveMobile: boolean) => {
    if (!IS_SERVER && window.innerWidth < 768) {
      return (underMobile ? " |" : "")
    } else {
      return (aboveMobile ? " |" : "")
    }
  }

  return (
    <footer className={`GeneralFooter ${isTransparent ? "isTransparent" : ""}`}>
      <div className="GeneralFooter__content">
        <div className="GeneralFooter__content--text">
          <FooterTextEach head={META_FOOTER.TITLE} body={showBtwBar(true, true)} />
          <FooterTextEach head={"Address"} body={`${META_FOOTER.ADDRESS}`} />
          <p>
            <span className="GeneralFooter__content__terms" onClick={onUseClick}>
              Use of Terms&nbsp;|&nbsp;
            </span>
            <span className="GeneralFooter__content__terms" onClick={onPrivacyClick}>
              Privacy Policy&nbsp;|&nbsp;
            </span>
            <Link href={'/'} as={'/'}>
              <span className="GeneralFooter__content__terms">FAQ</span> 
            </Link>
          </p>
        </div>

        <div className="GeneralFooter__content--icons">
          <FooterIconEach
            link={META_SNS.youtube}
            imgSrc={`/static/images/icons/sns-youtube.png`} />
          <FooterIconEach
            link={META_SNS.instagram}
            imgSrc={`/static/images/icons/sns-insta.png`} />
          <FooterIconEach
            link={META_SNS.facebook}
            imgSrc={`/static/images/icons/sns-facebook.png`} />
          <FooterIconEach
            link={META_SNS.kakao}
            imgSrc={`/static/images/icons/sns-kakao.png`} />
          <FooterIconEach
            link={META_SNS.naver}
            imgSrc={`/static/images/icons/sns-naver.png`} />
          <FooterIconEach
            link={META_SNS.blog}
            imgSrc={`/static/images/icons/sns-blog.png`} />
        </div>
      </div>
    </footer>
  )
}

export default observer(GeneralFooter)