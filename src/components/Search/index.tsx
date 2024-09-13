import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedView } from '../ThemedView';
import { Search as SearchIcon } from 'lucide-react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';

type SearchProps = {
  onSearch: (text: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
  const colors = useThemeColor();
  const [text, setText] = useState('');

  const handleSearch = () => {
    onSearch(text);
  };

  return (
    <ThemedView style={[styles.container, { borderColor: colors.border }]}>
      <TextInput
        placeholder="Search"
        style={[
          styles.input,
          {
            color: colors.text,
          },
        ]}
        placeholderTextColor={colors.placeholder}
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <SearchIcon color={colors.icon} size={20} />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 1,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    flex: 1,
  },
});
