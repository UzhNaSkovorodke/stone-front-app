import { MainLayout } from 'src/layouts/MainLayout'
import { FC, useState } from 'react'
import { OpeningBlock } from 'src/features/investments/components/OpeningBlock/OpeningBlock'
import { InvestmentStrategies } from 'src/features/investments/components/InvestmentStrategies/InvestmentStrategies'
import { NumbersAndSlogan } from 'src/features/investments/components/NumbersAndSlogan/NumbersAndSlogan'
import {
  ETabTitle,
  SelectionRules,
} from 'src/features/investments/components/SelectionRules/SelectionRules'
import { ProjectsSlider } from 'src/features/investments/components/ProjectsSlider/ProjectsSlider'
import { IInvestmentsPageResponse } from 'shared/services/pageData/investments/investments.interface'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'
import { EFormPageType } from 'shared/components/Form/FormPage/FormPage'
import { Form } from 'shared/components/Form/Form'

export interface IInvestmentsPage {
  common: ICommonResponse
  investments: IInvestmentsPageResponse
}

const InvestmentsPage: FC<IInvestmentsPage> = ({ common, investments }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [projectsType, setProjectsType] = useState(ETabTitle.OFFICE)
  const sliderTitle: string | null = investments.data?.attributes.BlockAdvices.tabs[0].title

  return (
    <MainLayout common={common.data.attributes}>
      <OpeningBlock
        header={investments.data?.attributes.BlockMain.header}
        cards={investments.data?.attributes.BlockMain.cards}
      />

      <InvestmentStrategies strategies={investments.data?.attributes.BlockMain.BlockStrategies} />

      <NumbersAndSlogan
        numbers={investments.data?.attributes.BlockPromoSug1}
        slogan={investments.data?.attributes.BlockPromoSug2}
      />

      <SelectionRules
        advices={investments.data?.attributes.BlockAdvices}
        changeType={setProjectsType}
      />

      <Form.PageType
        formType={EFormPageType.INVEST}
        formData={investments.data?.attributes.BlockForm}
      />

      <ProjectsSlider
        title={sliderTitle}
        projects={investments.data?.attributes.stone_projects.data}
      />
    </MainLayout>
  )
}
export default InvestmentsPage
