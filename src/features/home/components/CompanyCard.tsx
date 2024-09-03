import {Box} from '@/components/Box';
import {CompanyIcon} from '@/components/CompanyIcon';
import {Text} from '@/components/Text';
import {companies, companyInfo} from '@/lib/models';

export type CompanyCardProps = {
  company: (typeof companies)[number];
};

export function CompanyCard({company}: CompanyCardProps) {
  return (
    <Box px="m" py="xs" flexDirection="row" alignItems="center">
      <CompanyIcon company={company} size={20} />
      <Text ml="s" fontWeight="bold" fontSize={20}>
        {companyInfo[company].name}
      </Text>
    </Box>
  );
}
